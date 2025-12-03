// 追加先の要素を取得（右コントロール内の適当な場所）
const container = document.getElementById('rightcontrols');

// 新しい div を作成
const multiUrlDiv = document.createElement('div');
multiUrlDiv.id = 'multi-url-container';
multiUrlDiv.style.padding = '10px';
multiUrlDiv.style.border = '1px solid #666';
multiUrlDiv.style.marginTop = '10px';
multiUrlDiv.innerHTML = '<h3>複数URL追加</h3>';

// 5つの入力ボックスとボタンを作成
for (let i = 1; i <= 5; i++) {
    const row = document.createElement('div');
    row.style.marginBottom = '5px';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `メディアURL${i}`;
    input.className = 'form-control multi-url-input';
    input.style.width = '70%';
    input.style.display = 'inline-block';

    const button = document.createElement('button');
    button.textContent = '末尾に追加';
    button.className = 'btn btn-default multi-url-add';
    button.style.display = 'inline-block';
    button.style.marginLeft = '5px';

    // クリックイベント
    button.addEventListener('click', () => {
        const url = input.value.trim();
        if (!url) return alert('URLを入力してください');

        try {
            queueAddEnd(url); // Cytube の関数
            input.value = '';
        } catch (e) {
            console.error('動画追加エラー', e);
            alert('動画を追加できませんでした');
        }
    });

    row.appendChild(input);
    row.appendChild(button);
    multiUrlDiv.appendChild(row);

}

// ページに追加
container.appendChild(multiUrlDiv);

(function() {
    // 追加用の親コンテナを作成
    const multiUrlContainer = document.createElement('div');
    multiUrlContainer.id = 'multi-url-box';
    multiUrlContainer.style.padding = '10px';
    multiUrlContainer.style.border = '1px solid #666';
    multiUrlContainer.style.marginTop = '10px';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '複数URL登録を開く/閉じる';
    toggleBtn.style.marginBottom = '8px';
    toggleBtn.onclick = () => {
        if (multiUrls.style.display === 'none') multiUrls.style.display = 'block';
        else multiUrls.style.display = 'none';
    };
    multiUrlContainer.appendChild(toggleBtn);

    const multiUrls = document.createElement('div');
    multiUrls.style.display = 'none';
    multiUrls.style.marginTop = '8px';
    multiUrlContainer.appendChild(multiUrls);

    // URLボックスを最大5つ作成
    const urlBoxes = [];
    for (let i = 0; i < 5; i++) {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '4px';
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `URL ${i + 1}`;
        input.style.width = '70%';
        input.style.marginRight = '4px';

        const btn = document.createElement('button');
        btn.textContent = '末尾に追加';
        btn.onclick = () => {
            if (input.value.trim()) {
                // CyTubeのqueue_endボタンを使って末尾追加
                const urlInput = document.getElementById('mediaurl');
                urlInput.value = input.value.trim();
                document.getElementById('queue_end').click();
                input.value = '';
            }
        };

        wrapper.appendChild(input);
        wrapper.appendChild(btn);
        multiUrls.appendChild(wrapper);
        urlBoxes.push({input, btn});
    }

    // ページに追加（右コントロール下）
    const rightControls = document.getElementById('rightcontrols');
    rightControls.appendChild(multiUrlContainer);
})();




