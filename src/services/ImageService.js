import axios from 'axios';
import UserService from "./UserService";

const baseUrl = 'http://localhost:8090/image'

class ImageService {
    upload(id, image){
        const formData = new FormData();
        formData.append("file", image);

        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': true,
                'X-XSRF-TOKEN': UserService.getCsrfToken,
                'Content-Type': 'multipart/form-data; boundary=--ololo'
            }
        }).post('/' + id, formData, {withCredentials: true})
    }

    avatarLink(avatar){
        return (avatar) ?
            "http://localhost:8090/image/" + avatar.id :
            require('@/assets/paw_icon.png');
    }
}

export default new ImageService();
