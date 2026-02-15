// Inline Editor for Page Builder
let editingElement = null;
let originalContent = null;
let currentSectionId = null;

// Make elements editable
function makeElementsEditable(sectionDiv, sectionId) {
    // Skip if this section has custom editor (like hero2)
    if (sectionDiv.getAttribute('data-has-custom-editor') === 'true') {
        return;
    }
    
    // Skip if this is a hero2 section (has its own editor)
    if (sectionDiv.querySelector('.hero2-section')) {
        return;
    }
    
    // Make text elements editable
    const textElements = sectionDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .subtitle, .btn-main, a.btn-main');
    textElements.forEach(element => {
        // Skip if inside overlay
        if (element.closest('.section-item-overlay')) return;
        // Skip if it's a hero2 element or has custom editor
        if (element.classList.contains('hero2-editable')) return;
        if (element.getAttribute('data-has-custom-editor') === 'true') return;
        
        element.classList.add('editable-text');
        element.setAttribute('data-section-id', sectionId);
        
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            startTextEdit(this, sectionId);
        });
    });
    
    // Make images editable
    const images = sectionDiv.querySelectorAll('img');
    images.forEach(img => {
        // Skip if inside overlay or is background
        if (img.closest('.section-item-overlay')) return;
        if (img.classList.contains('jarallax-img')) return;
        // Skip if it's a hero2 element
        if (img.closest('.hero2-section')) return;
        if (img.closest('[data-has-custom-editor="true"]')) return;
        
        img.classList.add('editable-image');
        img.setAttribute('data-section-id', sectionId);
        
        // Add edit icon overlay
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'image-edit-wrapper';
        img.parentNode.insertBefore(imgWrapper, img);
        imgWrapper.appendChild(img);
        
        const editIcon = document.createElement('div');
        editIcon.className = 'image-edit-icon';
        editIcon.innerHTML = '<i class="icofont-image"></i> Change Image';
        imgWrapper.appendChild(editIcon);
        
        editIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            startImageEdit(img, sectionId);
        });
    });
}

// Start text editing
function startTextEdit(element, sectionId) {
    // Skip if this element has custom editor
    if (element.getAttribute('data-has-custom-editor') === 'true') {
        return;
    }
    // Skip if this is a hero2 element
    if (element.classList.contains('hero2-editable') || element.closest('.hero2-section')) {
        return;
    }
    // Skip if inside section with custom editor
    if (element.closest('[data-has-custom-editor="true"]')) {
        return;
    }
    
    // Save original content
    originalContent = element.innerHTML;
    currentSectionId = sectionId;
    editingElement = element;
    
    // Make contenteditable
    element.contentEditable = true;
    element.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    // Add editing class
    element.classList.add('editing');
    
    // Show save/cancel buttons
    showEditToolbar(element, sectionId);
    
    // Handle blur (click outside)
    element.addEventListener('blur', function handler() {
        element.removeEventListener('blur', handler);
        // Delay to allow toolbar clicks
        setTimeout(() => {
            if (element.classList.contains('editing')) {
                saveTextEdit(element, sectionId);
            }
        }, 200);
    });
    
    // Handle Enter key
    element.addEventListener('keydown', function handler(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            element.removeEventListener('keydown', handler);
            saveTextEdit(element, sectionId);
        }
        if (e.key === 'Escape') {
            element.removeEventListener('keydown', handler);
            cancelTextEdit(element);
        }
    });
}

// Show edit toolbar
function showEditToolbar(element, sectionId) {
    // Remove ALL existing toolbars (including hero2 toolbars)
    const existingToolbars = document.querySelectorAll('.edit-toolbar, .slide-edit-toolbar, .hero2-edit-toolbar');
    existingToolbars.forEach(tb => tb.remove());
    
    // Check if element is a button/link - add link edit option
    const isButton = element.tagName === 'A' || element.tagName === 'BUTTON' || element.classList.contains('btn-main');
    
    const toolbar = document.createElement('div');
    toolbar.className = 'edit-toolbar';
    
    if (isButton) {
        // For buttons, show Save, Edit Link, and Cancel
        const currentLink = element.getAttribute('href') || '#';
        toolbar.innerHTML = `
            <button class="btn-save" onclick="saveTextEdit(editingElement, ${sectionId})">
                <i class="icofont-check"></i> Save
            </button>
            <button class="btn-edit-link" onclick="editButtonLink(editingElement, ${sectionId})">
                <i class="icofont-link"></i> Edit Link
            </button>
            <button class="btn-cancel" onclick="cancelTextEdit(editingElement)">
                <i class="icofont-close"></i> Cancel
            </button>
        `;
    } else {
        // For regular text, show Save and Cancel only
        toolbar.innerHTML = `
            <button class="btn-save" onclick="saveTextEdit(editingElement, ${sectionId})">
                <i class="icofont-check"></i> Save
            </button>
            <button class="btn-cancel" onclick="cancelTextEdit(editingElement)">
                <i class="icofont-close"></i> Cancel
            </button>
        `;
    }
    
    document.body.appendChild(toolbar);
    
    // Position toolbar near element
    const rect = element.getBoundingClientRect();
    toolbar.style.top = (rect.bottom + window.scrollY + 10) + 'px';
    toolbar.style.left = (rect.left + window.scrollX) + 'px';
}

// Edit button link
window.editButtonLink = function(element, sectionId) {
    if (!element) return;
    
    const currentLink = element.getAttribute('href') || '#';
    const newLink = prompt('Enter button link:', currentLink);
    
    if (newLink !== null && newLink !== currentLink) {
        // Update href immediately
        element.setAttribute('href', newLink.startsWith('http') ? newLink : '/' + newLink.replace(/^\//, ''));
        
        console.log('Saving button link:', {
            sectionId: sectionId,
            newLink: newLink,
            element: element
        });
        
        // Save to database
        saveInlineEdit(sectionId, element);
        
        showNotification('Button link updated!', 'success');
    }
}

// Save inline edit (removed reload function)
// Now just use saveInlineEdit directly

// Save text edit
function saveTextEdit(element, sectionId) {
    if (!element) return;
    
    const newContent = element.innerHTML;
    
    // Remove editing state
    element.contentEditable = false;
    element.classList.remove('editing');
    
    // Remove toolbar
    const toolbar = document.querySelector('.edit-toolbar');
    if (toolbar) {
        toolbar.remove();
    }
    
    // If content changed, save to database
    if (newContent !== originalContent) {
        saveInlineEdit(sectionId, element);
    }
    
    editingElement = null;
    originalContent = null;
}

// Cancel text edit
function cancelTextEdit(element) {
    if (!element) return;
    
    // Restore original content
    element.innerHTML = originalContent;
    element.contentEditable = false;
    element.classList.remove('editing');
    
    // Remove toolbar
    const toolbar = document.querySelector('.edit-toolbar');
    if (toolbar) {
        toolbar.remove();
    }
    
    editingElement = null;
    originalContent = null;
}

// Start image editing
function startImageEdit(img, sectionId) {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Show preview immediately
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
                
                // Upload to server
                uploadImage(file, img, sectionId);
            };
            reader.readAsDataURL(file);
        }
    });
    
    input.click();
}

// Upload image
async function uploadImage(file, img, sectionId) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('section_id', sectionId);
    
    try {
        const response = await fetch('/api/page-builder/upload-image', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Update image src with uploaded path
            img.src = data.image_url;
            
            // Save to section content
            saveInlineEdit(sectionId, img);
            
            showNotification('Image uploaded successfully!', 'success');
        } else {
            showNotification('Failed to upload image', 'error');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        showNotification('Error uploading image', 'error');
    }
}

// Save inline edit to database
async function saveInlineEdit(sectionId, element) {
    console.log('saveInlineEdit called:', { sectionId, element, sections });
    
    // Get section
    const section = sections.find(s => s.id == sectionId);
    if (!section) {
        console.error('Section not found:', sectionId);
        return;
    }
    
    // Parse current content
    let content = {};
    try {
        content = section.content ? JSON.parse(section.content) : {};
    } catch (e) {
        content = {};
    }
    
    console.log('Current content:', content);
    
    // Check if element is part of a slide (hero slider)
    const slideIndex = element.getAttribute('data-slide');
    const isSlideElement = slideIndex !== null;
    
    console.log('Element info:', {
        slideIndex: slideIndex,
        isSlideElement: isSlideElement,
        tagName: element.tagName,
        dataField: element.getAttribute('data-field')
    });
    
    // Update content based on element type
    if (element.tagName === 'IMG') {
        // Update image path
        const imgSrc = element.src.replace(window.location.origin + '/', '');
        
        if (isSlideElement && content.slides && content.slides[slideIndex]) {
            // Update slide background
            content.slides[slideIndex].background_image = imgSrc;
        } else if (element.closest('.jarallax')) {
            content.background_image = imgSrc;
        } else {
            content.side_image = imgSrc;
            content.image = imgSrc;
        }
    } else {
        // Update text content
        const text = element.textContent.trim();
        
        if (isSlideElement && content.slides && content.slides[slideIndex]) {
            // Update slide content
            const field = element.getAttribute('data-field');
            
            if (field === 'title') {
                content.slides[slideIndex].title = text;
            } else if (field === 'subtitle') {
                content.slides[slideIndex].subtitle = text;
            } else if (field === 'description') {
                content.slides[slideIndex].description = text;
            } else if (field === 'button_text') {
                content.slides[slideIndex].button_text = text;
                
                // Also update button link if element is a link
                if (element.tagName === 'A') {
                    const href = element.getAttribute('href');
                    if (href) {
                        content.slides[slideIndex].button_link = href.replace(window.location.origin + '/', '');
                    }
                }
            }
        } else {
            // Update regular section content (not slide)
            if (element.tagName.match(/H[1-6]/)) {
                content.title = text;
            } else if (element.classList.contains('subtitle')) {
                content.subtitle = text;
            } else if (element.tagName === 'P') {
                content.description = text;
            } else if (element.classList.contains('btn-main') || element.tagName === 'A') {
                // Update button text
                content.button_text = text;
                
                // Update button link if element is a link
                if (element.tagName === 'A') {
                    const href = element.getAttribute('href');
                    if (href) {
                        // Remove base_url if present
                        content.button_link = href.replace(window.location.origin + '/', '');
                    }
                }
            }
        }
    }
    
    console.log('Updated content:', content);
    
    // Save to database
    try {
        const response = await fetch('/api/page-builder/update-section/' + sectionId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content })
        });
        
        const data = await response.json();
        
        console.log('Save response:', data);
        
        if (data.success) {
            // Update local section
            section.content = JSON.stringify(content);
            showNotification('Changes saved!', 'success');
        }
    } catch (error) {
        console.error('Error saving:', error);
        showNotification('Error saving changes', 'error');
    }
}

// Initialize inline editing for all sections
function initInlineEditing() {
    sections.forEach(section => {
        const sectionDiv = document.querySelector(`[data-section-id="${section.id}"]`);
        if (sectionDiv) {
            makeElementsEditable(sectionDiv, section.id);
            makeSectionDraggable(sectionDiv, section.id);
        }
    });
}

// Make section draggable
function makeSectionDraggable(sectionDiv, sectionId) {
    sectionDiv.draggable = true;
    
    sectionDiv.addEventListener('dragstart', function(e) {
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', sectionId);
    });
    
    sectionDiv.addEventListener('dragend', function(e) {
        this.classList.remove('dragging');
        
        // Remove all drag-over classes
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
    });
    
    sectionDiv.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const dragging = document.querySelector('.dragging');
        if (dragging && dragging !== this) {
            this.classList.add('drag-over');
        }
    });
    
    sectionDiv.addEventListener('dragleave', function(e) {
        this.classList.remove('drag-over');
    });
    
    sectionDiv.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const draggedId = parseInt(e.dataTransfer.getData('text/html'));
        const droppedOnId = sectionId;
        
        if (draggedId !== droppedOnId) {
            reorderSectionsByDrag(draggedId, droppedOnId);
        }
    });
}

// Reorder sections by drag and drop
async function reorderSectionsByDrag(draggedId, droppedOnId) {
    const draggedIndex = sections.findIndex(s => s.id == draggedId);
    const droppedIndex = sections.findIndex(s => s.id == droppedOnId);
    
    if (draggedIndex === -1 || droppedIndex === -1) return;
    
    // Reorder array
    const [draggedSection] = sections.splice(draggedIndex, 1);
    sections.splice(droppedIndex, 0, draggedSection);
    
    // Update order in database
    try {
        const response = await fetch('/api/page-builder/reorder-sections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sections: sections.map((s, idx) => ({ id: s.id, order: idx + 1 }))
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Reorder DOM
            const container = document.getElementById('sections-container');
            const sectionDivs = [];
            
            sections.forEach(section => {
                const div = document.querySelector(`[data-section-id="${section.id}"]`);
                if (div) {
                    sectionDivs.push(div);
                }
            });
            
            container.innerHTML = '';
            sectionDivs.forEach(div => {
                container.appendChild(div);
            });
            
            // Update overlays
            updateAllOverlays();
            
            showNotification('Section reordered!', 'success');
        }
    } catch (error) {
        console.error('Error reordering:', error);
        showNotification('Error reordering sections', 'error');
    }
}

// Call after sections are loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (sections.length > 0) {
            initInlineEditing();
        }
    }, 1000);
});
