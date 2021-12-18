import { useNavigate } from 'react-router-dom';
import * as carpentryService from '../../services/carpentryService';
import { useAuthContext } from '../../contexts/AuthContex';



const Create = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const onCarpentryCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let name = formData.get('name').trim();
        let description = formData.get('description').trim();
        let imageUrl = formData.get('imageUrl').trim();
        let category = formData.get('category').trim();

        carpentryService.create({
            name,
            description,
            imageUrl,
            category,
        }, user.accessToken)
            .then(result => {
                navigate('/');
            })
            .catch (err => {
                console.log(err)
             });
    }

    return (
<form className="create" onSubmit={onCarpentryCreate} method="POST">
                    <fieldset>
                        <legend>Create Form</legend>
                        <p>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Some art"/>
                        </p>
                        
                        <p>
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols="50"
                                      rows="10"></textarea>
                        </p>

                        <p>
                            <label htmlFor="image">Image</label>
                            <input type="text" name="imageUrl" id="image" placeholder='imageUrl'/>
                        </p>

                        <p>
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" id="price"/>
                        </p>
                        <p>
                            <label htmlFor="category">Category</label>
                            <select name="category" id="category">
                                <option value="">Please select .....</option>
                                <option value="toy">Toys</option>
                                <option value="art">Art</option>
                                <option value="furniture">Furniture</option>
                            </select>
                        </p>
                        <p>
                          <input type="submit" value="Send it!"/>
                        </p>
                    </fieldset>
                </form>
    );
};


export default Create;