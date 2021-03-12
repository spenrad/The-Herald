import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../../utils/API";
import { Tab, Tabs, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Card } from 'react-bootstrap';
import "./style.css";

function NewsFeed() {
    const [userData, setUserData] = useState([]);
    const [articles, setArticles] = useState([]);

    const getUserData = function () {
        API.getUserInfo().then(function (res) {
            let articles = res.data.topic
            setUserData(articles);
        });
    };

    useEffect(function () {
        getUserData();
    }, []);

    const search = (country) => {
        API.newsArticlesProfile(country).then((res) => {
            let data = res.data.articles;
            setArticles(data);
        });
    };

    return (
        <Tabs>
            <TabList>
                {/* MAPS THE SAVED COUNTRIES FOR TAB HEADERS*/}
                <Tab>Your News Feed</Tab>
                {userData.map(country => {

                    return (
                        <Tab onClick={() => search(country)}>{country}</Tab>
                    );
                })}
            </TabList>

            {/* SEARCHES API WITH COUNTRY NAME AND OUTPUTS THE ARTICLES HERE */}

            {articles.map((article, index) => {
                // console.log("ARTICLES???")
                return (
                    <a href={article.url} target="_blank" rel="noreferrer" key={index}>
                        <div className="container-div">
                            <Card className="bg-dark text-white" to={article.url}>
                                <Card.Img src={article.urlToImage || null ? article.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE4XS9WxfgNvETnRb2FpJYq1mLc8K9GRJU_w&usqp=CAU"}
                                    alt="Card image"
                                />
                                <div className="imgOverlay">
                                    <Card.ImgOverlay className="opacity-.25">
                                        <Card.Title><span className="title">{article.title}</span></Card.Title>
                                        <Card.Text >
                                            <span className="desc">{article.description}</span>
                                        </Card.Text>
                                        <Card.Text><span className="desc">By: {article.author}</span></Card.Text>
                                    </Card.ImgOverlay>
                                </div>
                            </Card>
                        </div>
                    </a>
                );
            })}
        </Tabs>
    );
}

export default NewsFeed;
