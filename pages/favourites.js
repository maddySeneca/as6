// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import ArtworkCard from '/components/ArtworkCard'; 
// import { useAtom } from 'jotai'; 
// import { favouritesAtom } from '/store';

// function Favourites() {
//     const [favouritesList] = useAtom(favouritesAtom);

//     return (
//         <Container>
//             <h1 className="my-4">Favourites</h1>
//             {favouritesList.length === 0 ? (
//                 <p>Nothing Here. Try adding some new artwork to the list.</p>
//             ) : (
//                 <Row>
//                     {favouritesList.map((objectID) => (
//                         <Col key={objectID} xs={12} md={6} lg={4} className="mb-4">
//                             <ArtworkCard objectID={objectID} />
//                         </Col>
//                     ))}
//                 </Row>
//             )}
//         </Container>
//     );
// }

// export default Favourites;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArtworkCard from '/components/ArtworkCard'; 
import { useAtom } from 'jotai'; 
import { favouritesAtom } from '/store';

function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    // Ensure that favouritesList is not null before rendering
    if (!favouritesList) return null;

    return (
        <Container>
            <h1 className="my-4">Favourites</h1>
            {favouritesList.length === 0 ? (
                <p>Nothing Here. Try adding some new artwork to the list.</p>
            ) : (
                <Row>
                    {favouritesList.map((objectID) => (
                        <Col key={objectID} xs={12} md={6} lg={4} className="mb-4">
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Favourites;
