import { useState } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import submitPrompt from '@/tools/libs/services/submitPrompt';

const PresentationOutline = () => {
  const { response } = useSelector((state) => state.tools);
  const { data: userData } = useSelector((state) => state.user);
  // console.log(response);
  const [selectedOutline, setSelectedOutline] = useState(null);
  const router = useRouter();

  const handleGeneratePresentation = async () => {
    const payload = {
      tool_data: {
        tool_id: 'presentation',
        inputs: [
          { name: 'content', value: 'world war II' },
          { name: 'outline', value: selectedOutline },
        ],
      },
      type: 'tool',
      user: {
        id: userData?.id,
        fullName: userData?.fullName,
        email: userData?.email,
      },
    };
    try {
      const response = await submitPrompt(payload);
      if (response) {
        // Store response in sessionStorage
        sessionStorage.setItem('presentationData', JSON.stringify(response));

        // Redirect to the PresentationResponse page without the long URL
        router.push('/PresentationResponse');
      }
    } catch (error) {
      console.error('Error generating presentation:', error);
    }
  };

  return (
    <div
      style={{
        width: 800,
        height: 792.7,
        padding: 28,
        background: '#0C0B17',
        borderRadius: 20,
        border: '2px #9D74FF solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 36,
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 7,
          display: 'flex',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            color: 'white',
            fontSize: 28,
            fontFamily: 'Satoshi',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          Presentation Outline
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            color: '#B3B2B2',
            fontSize: 16,
            fontFamily: 'Satoshi',
            fontWeight: '500',
            wordWrap: 'break-word',
          }}
        >
          Create a presentation for specific content.
        </div>
      </div>
      <div
        style={{
          alignSelf: 'stretch',
          height: 633.7,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 24,
          display: 'flex',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            height: 128,
            borderRadius: 12,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 8,
            display: 'flex',
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              color: 'white',
              fontSize: 16,
              fontFamily: 'Satoshi',
              fontWeight: '700',
              wordWrap: 'break-word',
            }}
          >
            Presentation Details
          </div>
          <div
            style={{
              alignSelf: 'stretch',
              height: 98,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              background: '#24272F',
              borderRadius: 15,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 20,
              display: 'flex',
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 20,
                display: 'inline-flex',
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Satoshi',
                  fontStyle: 'italic',
                  fontWeight: '500',
                  wordWrap: 'break-word',
                }}
              />
            </div>
            <div
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px #DECDFF dotted',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 8,
                display: 'inline-flex',
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'Satoshi',
                  fontWeight: '700',
                  wordWrap: 'break-word',
                }}
              >
                Document.pdf
              </div>
              <div data-svg-wrapper style={{ position: 'relative' }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3L9 9M9 3L3 9"
                    stroke="#B096FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 12,
            paddingRight: 24,
            background: '#121212',
            borderRadius: 12,
            overflow: 'hidden',
            justifyContent: 'flex-start',
            alignItems: 'center',
            display: 'inline-flex',
          }}
        >
          <div
            style={{
              width: 708,
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 12,
              display: 'inline-flex',
            }}
          >
            {response.map((outline, id) => (
              <div
                key={id}
                onClick={() => setSelectedOutline(outline)}
                style={{
                  alignSelf: 'stretch',
                  padding: 8,
                  background:
                    selectedOutline === outline ? '#3C3C3C' : '#1C1C1C',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: 10,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 8,
                  display: 'inline-flex',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Satoshi',
                    fontWeight: '900',
                    wordWrap: 'break-word',
                  }}
                >
                  {id + 1}.
                </div>
                <div
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'Satoshi',
                    fontWeight: '400',
                    wordWrap: 'break-word',
                  }}
                >
                  {outline}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 31,
            display: 'inline-flex',
          }}
        >
          <button
            onClick={handleGeneratePresentation}
            disabled={!selectedOutline}
            style={{
              width: 224,
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 12,
              paddingBottom: 12,
              background: '#8552FF',
              borderRadius: 26.89,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'flex',
              border: 'none',
              cursor: selectedOutline ? 'pointer' : 'not-allowed',
              opacity: selectedOutline ? 1 : 0.5,
            }}
          >
            <div
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontFamily: 'Satoshi',
                fontWeight: '700',
                wordWrap: 'break-word',
              }}
            >
              Generate Presentation
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationOutline;
