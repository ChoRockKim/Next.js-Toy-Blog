export default async function Write2() {
    
    
    async function handleSubmit(formData) {
        'use server'
        console.log(formData.get('title'))
    }
    
    return(
        <div className="p-20">
            <form action={handleSubmit}>
                <input name='title'></input>
                <button type="submit">버튼</button>
            </form>

        </div>
    )
}