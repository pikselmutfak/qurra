import Button from "./Button"

const Share = () => {

    // const headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');

    const imageURL = 'https://lovecards.blob.core.windows.net/images/welcome.png'
    
    const handleShare = async () => {

    try {
        const response = await fetch(imageURL.toString());
        const blob = await response.blob();
        console.log('blob', blob)

        const title = 'welcome'
  
        const filesArray = [
          new File([blob], `${title}.png`, {
            type: 'image/png',
            lastModified: new Date().getTime()
          }),
        ];
  
        const shareData = {
          files: filesArray
        };
  
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          alert('File sharing is not supported in this browser.');
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    };
  

    return (
        <>
            <div>
                <img 
                    alt="share" 
                    style={{
                        maxWidth: 300
                    }}
                    src={imageURL} 
                />
                <Button title="Share" onClick={handleShare} />
            </div>
        </>
    )
}

export default Share