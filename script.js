// 1. Data Source
const myKnowledgeData = [
    {
        id: 'eda',
        tag: 'Data Analysis',
        title: 'Exploratory Data Analysis',
        desc: 'Techniques for data cleaning and profiling.',
        notes: [
            { title: "Handling Missing Values", content: "<h3>Missing Values</h3><p>Use KNNImputer for high-dimensional data.</p>" },
            { title: "Outlier Detection", content: "<h3>Outliers</h3><p>Isolation Forests work best for multidimensional data.</p>" }
        ]
    },
    {
        id: 'ml',
        tag: 'Machine Learning',
        title: 'Supervised Learning',
        desc: 'Regression, Classification, and Ensembles.',
        notes: [
            { title: "Bias vs Variance", content: "<h3>Bias-Variance Tradeoff</h3><p>High bias leads to underfitting.</p>" }
        ]
    }
];

// 2. Tab Logic
function openTab(evt, tabName) {
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(c => c.classList.remove("active"));
    const buttons = document.querySelectorAll(".tab-btn");
    buttons.forEach(b => b.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// 3. Card Builder
function renderKnowledgeCards() {
    const container = document.getElementById('knowledge-grid-container');
    if (!container) return;
    container.innerHTML = myKnowledgeData.map(item => `
        <div class="topic-card" onclick="openNote('${item.id}')">
            <div>
                <span class="topic-tag">${item.tag}</span>
                <h3>${item.title}</h3>
                <p style="font-size: 0.9rem; color: #666;">${item.desc}</p>
            </div>
            <span class="update-tag">${item.notes.length} Notes</span>
        </div>
    `).join('');
}

// 4. Note Viewer Logic
function openNote(id) {
    const topic = myKnowledgeData.find(t => t.id === id);
    if (!topic) return;

    document.getElementById('viewer-topic-title').innerText = topic.title;
    const listContainer = document.getElementById('viewer-note-list');
    listContainer.innerHTML = topic.notes.map((note, index) => 
        `<li onclick="showSubNote('${id}', ${index})">${note.title}</li>`
    ).join('');

    showSubNote(id, 0); // Show first note
    document.getElementById('note-viewer').style.display = 'block';
}

function showSubNote(topicId, noteIndex) {
    const topic = myKnowledgeData.find(t => t.id === topicId);
    document.getElementById('viewer-text').innerHTML = topic.notes[noteIndex].content;
    
    // UI Update for active sidebar item
    const items = document.querySelectorAll('.viewer-sidebar li');
    items.forEach((li, idx) => {
        li.classList.toggle('active-note', idx === noteIndex);
    });
}

function closeViewer() {
    document.getElementById('note-viewer').style.display = 'none';
}

// Start everything
window.onload = () => {
    renderKnowledgeCards();
};