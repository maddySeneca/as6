import React from 'react';
import { ListGroup, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '../lib/userData'; 

function History() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const parseHistory = () => {
        let parsedHistory = [];
        searchHistory.forEach(h => {
            let params = new URLSearchParams(h);
            let entries = params.entries();
            parsedHistory.push(Object.fromEntries(entries));
        });
        return parsedHistory;
    };

    const historyClicked = (e, index) => {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        setSearchHistory(current => {
            let updatedHistory = [...current];
            updatedHistory.splice(index, 1);
            return updatedHistory;
        });
        await removeFromHistory(searchHistory[index]); 
    };

    const renderHistory = () => {
        const parsedHistory = parseHistory();
        if (parsedHistory.length === 0) {
            return (
                <Card>
                    <Card.Body>
                        <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
                    </Card.Body>
                </Card>
            );
        }
        return (
            <ListGroup>
                {parsedHistory.map((historyItem, index) => (
                    <ListGroup.Item key={index} className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
                        {Object.keys(historyItem).map(key => (
                            <span key={key}>{key}: <strong>{historyItem[key]}</strong>&nbsp;</span>
                        ))}
                        <Button className="float-end" variant="danger" size="sm" onClick={(e) => removeHistoryClicked(e, index)}>&times;</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    };

    if (!searchHistory) return null;

    return (
        <div>
            <h1>Search History</h1>
            {renderHistory()}
        </div>
    );
}

export default History;
