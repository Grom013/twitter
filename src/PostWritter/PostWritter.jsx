import { useState } from "react";

function PostWritter() {
    const [post, setPost] = useState('');
    const [serverMessage, setServerMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const onChange = (e)=>{
        setPost(e.target.value)
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        if(post.length===0){
            return
        }
        try {
            const response = await fetch('http://localhoast:3000/lastMessages',{
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({message: post})
            })

            if(!response.ok){
                console.error('HTTP error', response.status);
                throw new Error('Ощибка сети при отправке поста')
            }
            const data = await response.json()
            console.log('Answer from server', data);

            setServerMessage(data.message || 'Сообщение отправлено успешно')
            setShowMessage(true)

            setTimeout(() => {
                serverMessage(false)
            }, 2000);
        } catch (error) {
            console.error('произошла ошибка при выполнения запроса', error.message);
            setServerMessage('Ошибка при отправке сообщения')
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 2000);
        }
    }
    return ( 
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                className="input-post"
                type="text"
                placeholder="Что нового?"
                value={post}
                onChange={onChange}
                />
                <div className="input-container">
                    <div className="post-text">{post}</div>
                    <div className="input-container">
                        <div className="send-block">
                            <button className="camera-button" type="button" disabled>
                                <img src="../../public/img/camera_icon.svg" alt="camera icon"/>
                            </button>
                            <div>
                                <button className="subm-btn" type="submit">Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {showMessage && <div className="server-message">{serverMessage}</div>}
        </div>
     );
}

export default PostWritter;