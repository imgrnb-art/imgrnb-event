// == Cytube 5 URL BOX 一括追加（現状HTML対応版） ==
(function() {
    console.log("[Cytube] Multi URL BOX Loaded");

    const BOX_COUNT = 5; // BOXの数
    const CONTAINER_ID = "multi-url-box"; // 現状 HTML に合わせた ID

    function addUI() {
        const oldContainer = document.getElementById(CONTAINER_ID);
        if (!oldContainer) {
            console.log("[Cytube] #multi-url-box が見つからず待機…");
            setTimeout(addUI, 1000);
            return;
        }

        // 既存の内容をクリア
        oldContainer.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.style.padding = "10px";
        wrapper.style.border = "1px solid #666";
        wrapper.style.marginTop = "10px";

        const title = document.createElement("h3");
        title.textContent = "複数URL登録";
        wrapper.appendChild(title);

        const boxes = [];
        for (let i = 0; i < BOX_COUNT; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `URL ${i + 1}`;
            input.style.width = "100%";
            input.style.marginBottom = "4px";
            boxes.push(input);
            wrapper.appendChild(input);
        }

        const regBtn = document.createElement("button");
        regBtn.textContent = "順番に登録";
        regBtn.style.marginTop = "8px";
        wrapper.appendChild(regBtn);

        oldContainer.appendChild(wrapper);

        regBtn.onclick = () => {
            const urls = boxes.map(b => b.value.trim()).filter(Boolean);
            if (urls.length === 0) return alert("URLを1つ以上入力してください");

            urls.forEach(url => {
                try {
                    socket.emit("playlistAdd", { pos: "end", src: url });
                    console.log("[Cytube] 追加:", url);
                } catch (e) {
                    console.error("[Cytube] 追加失敗:", url, e);
                    alert("追加に失敗したURLがあります: " + url);
                }
            });

            alert(`${urls.length} 件のURLを追加しました`);
        };

        console.log("[Cytube] 5 BOX UI added!");
    }

    setTimeout(addUI, 2000);
})();
