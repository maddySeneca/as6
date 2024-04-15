import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';

function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      searchBy: "title",
      geoLocation: null,
      medium: null,
      isOnView: false,
      isHighlight: false,
      q: "",
    },
  });

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = async (data) => {
    let queryString = "";
    queryString += `${data.searchBy}=true`

    if (data.geoLocation){ queryString += `&geoLocation=${data.geoLocation}`};
    if (data.medium) {queryString += `&medium=${data.medium}`};

    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={6}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Form.Group controlId="formGeoLocation">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control name='geoLocation' type="text" placeholder="Enter geo location" {...register("geoLocation")} />
            <small className="text-muted form-text">Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator</small> <br /> <br />
          </Form.Group>

          <Form.Group controlId="formMedium">
            <Form.Label>Medium</Form.Label>
            <Form.Control name='medium' type="text" placeholder="Enter medium" {...register("medium")} />
            <small className="text-muted form-text">Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator</small> <br /> <br />
          </Form.Group>

          <Form.Group controlId="formIsOnView">
            <Form.Check name='isOnView' type="checkbox" label="Is On View" {...register("isOnView")} />
          </Form.Group>

          <Form.Group controlId="formIsHighlight">
            <Form.Check name='isHighlight' type="checkbox" label="Is Highlight" {...register("isHighlight")} />
          </Form.Group>

          Search By: <br />
          <select name='searchBy' {...register("searchBy")}>
            <option value="title" >Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </select><br /><br />

          <Form.Group controlId="formQ">
            <Form.Label>Search</Form.Label>
            <Form.Control name='q' type="text" placeholder="Enter search term" {...register("q", { required: true })} className={errors.q && 'is-invalid'} />
            {errors.q && <div className="invalid-feedback">This field is required</div>}
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default AdvancedSearch;
