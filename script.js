document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const clearAllButton = document.getElementById('clear-all-button');

    // Load tasks from Local Storage with error handling
    let tasks = [];
    try {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        tasks = [];
    }

    // Function to render tasks to the DOM
    const renderTasks = () => {
        todoList.innerHTML = '';
        
        if (tasks.length === 0) {
            todoList.innerHTML = '<div class="empty-state">No tasks yet. Add your first task above!</div>';
            clearAllButton.style.display = 'none';
            return;
        }

        clearAllButton.style.display = 'block';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = task.completed ? 'completed' : '';
            
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.addEventListener('click', () => toggleComplete(index));
            taskText.setAttribute('role', 'button');
            taskText.setAttribute('tabindex', '0');
            taskText.setAttribute('aria-label', `Toggle completion for: ${task.text}`);

            // Add keyboard support for task text
            taskText.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleComplete(index);
                }
            });

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions';

            const completeButton = document.createElement('button');
            completeButton.className = 'complete-btn';
            completeButton.setAttribute('aria-label', task.completed ? 'Mark as incomplete' : 'Mark as complete');
            completeButton.addEventListener('click', () => toggleComplete(index));
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.setAttribute('aria-label', `Delete task: ${task.text}`);
            deleteButton.addEventListener('click', () => deleteTask(index));

            actionsDiv.appendChild(completeButton);
            actionsDiv.appendChild(deleteButton);
            
            listItem.appendChild(taskText);
            listItem.appendChild(actionsDiv);
            todoList.appendChild(listItem);
        });
    };

    // Function to save tasks to Local Storage with error handling
    const saveTasks = () => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks to localStorage:', error);
            // Show user-friendly error message
            showNotification('Error saving tasks. Please try again.', 'error');
        }
    };

    // Function to show notifications
    const showNotification = (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            background: ${type === 'error' ? '#dc3545' : '#28a745'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Add a new task with validation
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        
        if (taskText === '') {
            showNotification('Please enter a task!', 'error');
            todoInput.focus();
            return;
        }
        
        if (taskText.length > 200) {
            showNotification('Task is too long (max 200 characters)', 'error');
            return;
        }

        // Check for duplicate tasks
        const isDuplicate = tasks.some(task => 
            task.text.toLowerCase() === taskText.toLowerCase()
        );
        
        if (isDuplicate) {
            showNotification('This task already exists!', 'error');
            return;
        }

        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        todoInput.value = '';
        todoInput.focus();
        showNotification('Task added successfully!');
    });

    // Toggle task completion with animation
    const toggleComplete = (index) => {
        if (index < 0 || index >= tasks.length) return;
        
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        
        // Add animation effect
        const listItem = todoList.children[index];
        if (listItem) {
            listItem.style.transform = 'scale(0.95)';
            setTimeout(() => {
                renderTasks();
            }, 150);
        } else {
            renderTasks();
        }
        
        const action = tasks[index].completed ? 'completed' : 'marked as incomplete';
        showNotification(`Task ${action}!`);
    };

    // Delete a task with confirmation and animation
    const deleteTask = (index) => {
        if (index < 0 || index >= tasks.length) return;
        
        const taskText = tasks[index].text;
        const listItem = todoList.children[index];
        
        // Animate removal
        if (listItem) {
            listItem.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
                showNotification(`Task "${taskText}" deleted!`);
            }, 300);
        } else {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            showNotification(`Task deleted!`);
        }
    };

    // Add slide out animation
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes slideOut {
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(slideOutStyle);

    // Clear all tasks with enhanced confirmation
    clearAllButton.addEventListener('click', () => {
        if (tasks.length === 0) return;
        
        const taskCount = tasks.length;
        const confirmMessage = `Are you sure you want to delete all ${taskCount} task${taskCount > 1 ? 's' : ''}? This cannot be undone.`;
        
        if (confirm(confirmMessage)) {
            tasks = [];
            saveTasks();
            renderTasks();
            showNotification(`All ${taskCount} tasks cleared!`);
        }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to add task
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            todoForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear input
        if (e.key === 'Escape' && document.activeElement === todoInput) {
            todoInput.value = '';
            todoInput.blur();
        }
    });

    // Auto-focus input on page load
    todoInput.focus();

    // Initial render of tasks on page load
    renderTasks();
});