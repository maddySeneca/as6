
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; 
import { addToFavourites, removeFromFavourites } from '../lib/userData';
import { useState, useEffect } from 'react'; 

const fetcher = (url) => fetch(url).then((res) => res.json());

function ArtworkCardDetail({ objectID }) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        if (objectID) {
            setShowAdded(favouritesList.includes(objectID));
        }
    }, [favouritesList, objectID]);
  
    const handleFavouritesClicked = async () => {
        try {
            if (showAdded) {
                await removeFromFavourites(objectID);
                setFavouritesList(await removeFromFavourites(objectID));
            } else {
                await addToFavourites(objectID);
                setFavouritesList(await addToFavourites(objectID));
            }
        } catch (error) {
            console.error('Error toggling favourites:', error);
        }
        setShowAdded(!showAdded);
    };

    const { data, error } = useSWR(
        objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, 
        fetcher
    );

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }

    const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data;

    return (
        <Card style={{ width: '18rem' }}>
            {primaryImage && <Card.Img variant="top" src={primaryImage} />}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}<br />
                    <strong>Classification:</strong> {classification || 'N/A'}<br />
                    <strong>Medium:</strong> {medium || 'N/A'}<br />
                    <br />
                    <strong>Artist:</strong> {artistDisplayName || 'N/A'}<br />
                    <strong>Credit Line:</strong> {creditLine || 'N/A'}<br />
                    <strong>Dimensions:</strong> {dimensions || 'N/A'}<br />
                    {artistDisplayName && (
                        <a href={artistWikidata_URL} target="_blank" rel="noreferrer">Wiki</a>
                    )}
                </Card.Text>
                <Button
                    variant={showAdded ? 'primary' : 'outline-primary'}
                    onClick={handleFavouritesClicked}
                >
                    {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ArtworkCardDetail;
