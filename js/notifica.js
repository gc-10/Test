document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const headerText = document.querySelector("#formContattaci > p"); // paragrafo da sostituire

    if(form && headerText){
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // blocco il comportamento standard del form

            const data = new FormData(form);

            try {
                // Invio dati al servizio FormSubmit
                await fetch(form.action, {
                    method: "POST",
                    body: data
                });

                // Reset del form
                form.reset();

                // Salvo il testo originale per poterlo ripristinare
                const originalText = headerText.textContent;

                // Sostituisco il testo con il messaggio di conferma
                headerText.textContent = "Messaggio inviato correttamente!";

                // Stile CSS per rendere il messaggio più evidente
                headerText.style.backgroundColor = "#000000ff";
                headerText.style.color = "green";
                headerText.style.marginTop = "20px";
                headerText.style.padding = "5px 15px";
                headerText.style.borderRadius = "25px";
                headerText.style.fontWeight = "bold";
                headerText.style.fontStyle = "italic";
                headerText.style.textAlign = "center";
                headerText.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                headerText.style.opacity = "0";
                headerText.style.transform = "translateY(-20px)";

                // Animazione di comparsa
                setTimeout(() => {
                    headerText.style.opacity = "1";
                    headerText.style.transform = "translateY(0)";
                }, 100);

                // Dopo 4 secondi ripristino il testo originale con fade-out
                setTimeout(() => {
                    headerText.style.opacity = "0";
                    headerText.style.transform = "translateY(-20px)";
                    setTimeout(() => {
                        headerText.textContent = originalText;
                        headerText.style.opacity = "1";
                        headerText.style.transform = "translateY(0)";
                        headerText.style.backgroundColor = "";
                        headerText.style.color = "";
                        headerText.style.padding = "";
                        headerText.style.borderRadius = "";
                        headerText.style.fontWeight = "";
                        headerText.style.fontStyle = "";
                        headerText.style.textAlign = "";
                    }, 500);
                }, 4000);

            } catch (err) {
                alert("❌ Errore nell'invio del messaggio");
            }
        });
    }
});
