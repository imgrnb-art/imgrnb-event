// == Cytube Multi URL Adder ==
// Cytube の外部 JS として動きます。

(function () {
    console.log("[Cytube] Multi URL Adder Loaded");

    // ---- 右上に追加ボタンを作る ----
    const btn = document.createElement("button");
    btn.textContent = "複数URL追加";
    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.right = "10px";
    btn.style.zIndex = 9999;
    btn.style.padding = "6px 10px";
    btn.style.background = "#1976d2";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
        const text = prompt(
            "URL を改行で複数貼り付けてください\n\n例:\nhttps://youtu.be/xxxx\nhttps://www.youtube.com/watch?v=yyyy"
        );

        if (!text) return;

        const urls = text
            .split(/\r?\n/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        if (urls.length === 0) {
            alert("URL がありません");
            return;
        }

        addSequential(urls);
    });

    // ---- Cytube に順番で追加する処理 ----
    function addSequential(urls) {
        let index = 0;

        const timer = setInterval(() => {
            if (index >= urls.length) {
                clearInterval(timer);
                alert(`追加完了：${urls.length} 件`);
                return;
            }

            const url = urls[index];
            console.log("[Cytube] 追加中:", url);

            // Cytube playlist API
            socket.emit("playlistAdd", {
                pos: "end",   // 最後に追加
                src: url
            });

            index++;
        }, 500); // ← 追加間隔（0.5秒）好みで調整可
    }
})();
