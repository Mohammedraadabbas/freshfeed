import React from "react";
import { Hero } from "../components/Hero";
import TopReads from "../components/TopReads";
import { ArticleGrid } from "../components/ArticleGrid";

function home() {
    return (
        <main>
            <Hero />
            <TopReads />
            <ArticleGrid />
        </main>
    );
}

export default home;
