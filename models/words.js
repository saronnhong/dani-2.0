class Word {
    constructor(
        // id,
        // categoryId,
        // word,
        // imageUrl
        id,
        categoryId,
        word,
        imageUrl,
        phonetic,
        color,
        voiceRecord,
        ownerId

    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.word = word;
        this.imageUrl = imageUrl;
        this.phonetic = phonetic;
        this.color = color;
        this.voiceRecord = voiceRecord;
        this.ownerId = ownerId;
    }
}

export default Word;