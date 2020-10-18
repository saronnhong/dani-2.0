class Word {
    constructor(
        _id,
        categoryId,
        word,
        imageUrl,
        phonetic,
        ownerId

    ) {
        this._id = _id;
        this.categoryId = categoryId;
        this.word = word;
        this.imageUrl = imageUrl;
        this.phonetic = phonetic;
        this.ownerId = ownerId;
    }
}

export default Word;