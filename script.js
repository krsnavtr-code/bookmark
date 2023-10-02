const primaryBookmark = document.getElementById("social-bookmark");

async function fetchBookmarkData() {
    try {
        const bookmarkData = await fetch("./data/socialLinks.json");
        console.log(bookmarkData);
        if (!bookmarkData.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await bookmarkData.json();
        console.log(data);
        // console.log(data.id);
        return data;
    } catch (error) {
        console.log("Error");
        return null;
    }
}
fetchBookmarkData()
    .then((data) => {
        // console.log(data);
        if (data !== null) {
            // Do something with the fetched data
            const article = document.createElement("article");
            article.className = data.id;
            console.log(data.id);
            // Create an h3 element for the title
            const h3 = document.createElement("h3");
            h3.textContent = data.title;
            console.log(data.title);
            // Create a p element for the description
            const p = document.createElement("p");
            p.textContent = `${data.description}`;
            console.log(data.description);
            // Create a ul element for the social links
            const ul = document.createElement("ul");

            if (Array.isArray(data.social)) {
                data.social.forEach((socialLink) => {
                    console.log(socialLink);
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <section class="wrapper">
                            <div class="top"><a target="_blank" href="${socialLink.link}">${socialLink.name}</a></div>
                            <div class="bottom" aria-hidden="true"><a target="_blank" href="${socialLink.link}">${socialLink.name}</a></div>
                        </section>
                    `
                    ul.appendChild(li);
                });
            } else {
                // Handle the case where data.social is not an array or is undefined
                console.error("Social data is not an array or is undefined");
            }
            article.appendChild(h3);
            article.appendChild(p);
            article.appendChild(ul);

            primaryBookmark.appendChild(article);
        } else {
            // Handle the case where fetching data failed
            console.warn('Fetching of bookmarks failed');
        }
    });