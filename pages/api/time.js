export default function handler(request, response) {
    let date = new Date()

    if (request.method == 'GET') {
        return response.status(200).json({date})
    }
}