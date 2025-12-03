// == Cytube 5 URL BOX 一括追加（最終版） ==
(function() {
    console.log("[Cytube] Multi URL BOX Loaded");

    const BOX_COUNT = 5;

    function addUI() {
        if(document.getElementById("multi-url-boxes")) return;

        const addBtn = document.getElementById("add-video-btn"); 
        if(!addBtn){
            console.log("[Cytube] #add-video-btn が見つからず待機…");
            setTimeout(addUI, 1000);
            return;
        }

        const container = document.createElement("div");
        container.id = "multi-url-boxes";
        container.style.display = "inline-flex";
        container.style.flexDirection = "row";
        container.style.alignItems = "center";
        container.style.marginLeft = "6px";

        const boxes = [];
        for(let i=0; i<BOX_COUNT; i++){
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `URL ${i+1}`;
            input.style.height = "28px";
            input.style.fontSize = "12px";
            input.style.marginRight = "4px";
            input.style.padding = "2px 4px";
            input.style.borderRadius = "3px";
            input.style.border = "1px solid #888";
            input.style.width = "150px";
            boxes.push(input);
            container.appendChild(input);
        }

        const regBtn = document.createElement("button");
        regBtn.textContent = "順番に追加";
        regBtn.className = "btn"; 
        regBtn.style.height = "28px";
        regBtn.style.fontSize = "12px";
        container.appendChild(regBtn);

        addBtn.parentNode.insertBefore(container, addBtn.nextSibling);

        regBtn.onclick = () => {
            const urls = boxes.map(b => b.value.trim()).filter(Boolean);
            if(urls.length === 0) return alert("URLを1つ以上入力してください");

            urls.forEach(url => {
                try {
                    // 現行 Cytube 互換方式
                    socket.emit("queue", {
                        id: url,
                        type: "media",
                        pos: "end"
                    });
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
