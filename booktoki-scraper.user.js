// ==UserScript==
// @name        booktoki469 Scraper
// @namespace   Violentmonkey Scripts
// @match       https://booktoki469.com/novel/*
// @grant       none
// @version     1.0
// @author      -
// @run-at      document-idle
// @description Saves the novel chapter to file
// ==/UserScript==

const chapterViewer = document.querySelector("#novel_content > div:nth-child(2)")

function getChapterContent() {
    const lines = []

    for (const line of chapterViewer.querySelectorAll("p")) {
        lines.push(line.textContent)
    }

    return lines
}

function getChapterNumber() {
    return document.querySelector(".toon-title").title.match(/\d+/)[0]
}

function simulateScroll() {
    chapterViewer.scrollIntoView({ behavior: "smooth", block: "end" })
}

function getRandomDelay(min, max) {
    return Math.random() * (max - min) + min
}

function waitAndContinue(delay) {
    const nextButton = document.querySelector("#goNextBtn")

    setTimeout(() => { nextButton.click() }, delay)
}

function downloadToFile(content, filename) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function main() {
    const chapterNum = getChapterNumber()
    console.log(`Found novel chapter number: ${chapterNum}`)

    const lines = getChapterContent()
    console.log("Found novel lines")


    downloadToFile(lines.join("\n\n"), `chapter-${chapterNum}.txt`)
    console.log(`Chapter content saved to ${chapterNum}, length: ${lines.length}`)

    simulateScroll()

    const randomDelay = getRandomDelay(2000, 4000)
    console.log(`Waiting ${(randomDelay/1000).toFixed(2)} seconds before continuing`)
    waitAndContinue(randomDelay)
}

main()
