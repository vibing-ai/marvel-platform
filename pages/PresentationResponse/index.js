import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PresentationResponse = () => {
    const router = useRouter();
    const { data } = router.query;

    const [presentationData, setPresentationData] = useState([]);

    useEffect(() => {
        console.log(data);
        if (data) {
            setPresentationData(JSON.parse(data));
        }
    }, [data]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Presentation Response</h1>
            {presentationData.length > 0 ? (
                <div>
                    {presentationData.map((item, index) => (
                        <div key={index} style={{ marginBottom: 20 }}>
                            <h2>{item.title}</h2>
                            <div>
                                {item.content.map((content, idx) => (
                                    <p key={idx}>{content}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PresentationResponse;