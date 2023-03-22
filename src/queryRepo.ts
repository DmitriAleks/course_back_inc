type VideoOutputModel = {
    id: string,
    title: string,
    author: {
        id: string,
        name: string
    }
}

type DBVideoType = {
    _id: string,
    title: string
    author_id: string
}

type DBAuthor = {
    _id: string,
    firstName: string,
    lastName: string
}

type BannedVideo = VideoOutputModel & {
    banReason: string
}


const queryRepo = {
    getVideos():VideoOutputModel[]{
        const dbVideos: DBVideoType[] = []
        const dbAuthors: DBAuthor[] = []


        return dbVideos.map(video => {
            const author = dbAuthors.find(a => a._id == video.author_id)
            return {
                id: video._id,
                title: video.title,
                author: {
                    id: author!._id,
                    name: author!.firstName
                }
            }
        })
    }
}


