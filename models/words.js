class Word {
    constructor(
        id,
        categoryId,
        word,
        imageUrl,
        phonetic,
        ownerId

    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.word = word;
        this.imageUrl = imageUrl;
        this.phonetic = phonetic;
        this.ownerId = ownerId;
    }
}

export default Word;