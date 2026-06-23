// --- TODO LIST / TAREFAS ENGINE ---
        export function getTodos() {
            let todos = localStorage.getItem('strudel_daw_todos');
            if (!todos) {
                return [];
            }
            return JSON.parse(todos);
        }

        export function saveTodos(todos) {
            localStorage.setItem('strudel_daw_todos', JSON.stringify(todos));
        }

        export function renderTodoPanel(container) {
            container.innerHTML = `
                <div class="todo-container">
                    <div class="todo-header-box">ORGANIZADOR DE MÚSICA</div>
                    <div class="todo-input-row">
                        <input type="text" id="todo-new-input" placeholder="Nova tarefa musical..." maxlength="60">
                        <button id="todo-add-btn">ADD</button>
                    </div>
                    <div class="todo-list-items" id="todo-list-items"></div>
                </div>
            `;

            const listContainer = document.getElementById('todo-list-items');
            const input = document.getElementById('todo-new-input');
            const addBtn = document.getElementById('todo-add-btn');

            const refreshTodoList = () => {
                listContainer.innerHTML = '';
                const todos = getTodos();

                if (todos.length === 0) {
                    listContainer.innerHTML = `
                        <div style="text-align:center; color:var(--text-secondary); font-size:0.8rem; margin-top:20px; line-height:1.4;">
                            Nenhuma tarefa! Adicione metas para seu projeto acima.
                        </div>
                    `;
                    return;
                }

                todos.forEach(todo => {
                    const item = document.createElement('div');
                    item.className = `todo-item ${todo.completed ? 'todo-item-checked' : ''}`;
                    
                    item.innerHTML = `
                        <div class="todo-item-content">
                            <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" title="Marcar como concluída"></div>
                            <span class="todo-text">${todo.text}</span>
                        </div>
                        <button class="todo-delete-btn" title="Excluir tarefa">🗑</button>
                    `;

                    // Checkbox toggle
                    item.querySelector('.todo-checkbox').onclick = () => {
                        todo.completed = !todo.completed;
                        const allTodos = getTodos();
                        const idx = allTodos.findIndex(t => t.id === todo.id);
                        if (idx > -1) {
                            allTodos[idx].completed = todo.completed;
                            saveTodos(allTodos);
                            refreshTodoList();
                        }
                    };

                    // Delete button
                    item.querySelector('.todo-delete-btn').onclick = () => {
                        const allTodos = getTodos();
                        const updated = allTodos.filter(t => t.id !== todo.id);
                        saveTodos(updated);
                        refreshTodoList();
                    };

                    listContainer.appendChild(item);
                });
            };

            const triggerAdd = () => {
                const text = input.value.trim();
                if (!text) return;
                const todos = getTodos();
                const newTodo = {
                    id: Date.now(),
                    text: text,
                    completed: false
                };
                todos.push(newTodo);
                saveTodos(todos);
                input.value = '';
                refreshTodoList();
            };

            addBtn.onclick = triggerAdd;
            input.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    triggerAdd();
                }
            };

            refreshTodoList();
        }
