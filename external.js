// == Cytube 5 URL BOX 一括追加（JSのみ、CSS別ファイル対応） ==
(function() {
    console.log("[Cytube] Multi URL BOX Loaded");

    const BOX_COUNT = 5; // BOXの数

    function addUI() {
        if(document.getElementById("multi-url-boxes")) return;

        const addBtn = document.getElementById("add-video-btn"); 
        if(!addBtn){
            console.log("[Cytube] #add-video-btn が見つからず待機…");
            setTimeout(addUI, 1000);
            return;
        }

        // コンテナ作成
        const container = document.createElement("div");
        container.id = "multi-url-boxes";

        // 5つの入力BOX
        const boxes = [];
        for(let i=0; i<BOX_COUNT; i++){
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `URL ${i+1}`;
            boxes.push(input);
            container.appendChild(input);
        }

        // 登録ボタン
        const regBtn = document.createElement("button");
        regBtn.textContent = "順番に追加";
        container.appendChild(regBtn);

        // 動画追加ボタンの右横に挿入
        addBtn.parentNode.insertBefore(container, addBtn.nextSibling);

        // 登録処理
        regBtn.onclick = () => {
            const urls = boxes.map(b => b.value.trim()).filter(Boolean);
            if(urls.length === 0) return alert("URLを1つ以上入力してください");

            urls.forEach(url => {
                try {
                    // 現行 Cytube 互換
                    socket.emit("playlistAdd", { pos: "end", src: url });
                    console.log("[Cytube] 追加:", url);
                } catch(e) {
                    console.error("[Cytube] 追加失敗:", url, e);
                    alert("追加に失敗したURLがあります: " + url);
                }
            });

            alert(`${urls.length} 件のURLを追加しました`);
        };

        console.log("[Cytube] UI added!");
    }

    setTimeout(addUI, 2000);
})();
