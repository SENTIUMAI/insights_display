Insights_Display.py
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './InsightDisplay.css'; // Assuming you have a CSS file for styling

const InsightDisplay = ({ insights }) => {
    // Helper function to format the date
    const formatDate = (dateString) => moment(dateString).format('MMMM Do YYYY, h:mm:ss a');

    return (
        <div className="insight-container">
            {insights.map((insight, index) => (
                <div key={index} className="insight-item">
                    <h3 className="insight-header">
                        {insight.sentiment}
                    </h3>
                    <p className="tweet-content">
                        <strong>Tweet:</strong> {insight.tweet}
                    </p>
                    <p className="insight-details">
                        <strong>Score:</strong> {insight.score.toFixed(2)}
                    </p>
                    <p className="insight-details">
                        <strong>Date:</strong> {formatDate(insight.created_at)}
                    </p>
                    <p className="insight-details">
                        <strong>ID:</strong> {insight.tweet_id}
                    </p>
                    <div className="sentiment-scores">
                        <p>
                            <strong>Vader Scores:</strong><br />
                            Compound: {insight.sentiment.vader.compound.toFixed(2)}<br />
                            Positive: {insight.sentiment.vader.pos.toFixed(2)}<br />
                            Negative: {insight.sentiment.vader.neg.toFixed(2)}<br />
                            Neutral: {insight.sentiment.vader.neu.toFixed(2)}
                        </p>
                        <p>
                            <strong>TextBlob Scores:</strong><br />
                            Polarity: {insight.sentiment.textblob.polarity.toFixed(2)}<br />
                            Subjectivity: {insight.sentiment.textblob.subjectivity.toFixed(2)}
                        </p>
                    </div>
                    <div className="additional-info">
                        <p><strong>Hashtags:</strong> {
                            insight.tweet.match(/#\w+/g) ? insight.tweet.match(/#\w+/g).join(', ') : 'None'
                        }</p>
                        <p><strong>Mentions:</strong> {
                            insight.tweet.match(/@\w+/g) ? insight.tweet.match(/@\w+/g).join(', ') : 'None'
                        }</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

InsightDisplay.propTypes = {
    insights: PropTypes.arrayOf(
        PropTypes.shape({
            sentiment: PropTypes.string.isRequired,
            tweet: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired,
            tweet_id: PropTypes.string.isRequired,
            sentiment: PropTypes.shape({
                vader: PropTypes.shape({
                    compound: PropTypes.number.isRequired,
                    pos: PropTypes.number.isRequired,
                    neg: PropTypes.number.isRequired,
                    neu: PropTypes.number.isRequired
                }).isRequired,
                textblob: PropTypes.shape({
                    polarity: PropTypes.number.isRequired,
                    subjectivity: PropTypes.number.isRequired
                }).isRequired
            }).isRequired