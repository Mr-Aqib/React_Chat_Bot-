export const apiDataFetch=async(prompt,apiKey)=>{
    const response=await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
            method:"POST",
            headers:{
                 "Content-Type": "application/json",
        "X-goog-api-key": apiKey
            },
            body:JSON.stringify({
                contents: [
      {
        parts: [
          {
            "text": prompt
          }
        ]
      }
    ]

            })
        }
    )
    return response.json()
}