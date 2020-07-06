class Sound {
    constructor(
        id,
        categoryId,
        name,
        imageUrl,
        nameToSay,
        factsToSay,
        soundsToSay

    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.imageUrl = imageUrl;
        this.nameToSay = nameToSay;
        this.factsToSay = factsToSay;
        this.soundsToSay = soundsToSay;
    }
}

export default Sound;