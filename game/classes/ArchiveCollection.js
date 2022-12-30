export default class ArchiveCollection {
    static LOCAL_STORAGE_KEY = 'Archive_collection';
    collectedIds;
    allArchives = []; // All the archives (whether collected or not).

    constructor(archives) {
        let localStorageArchives = JSON.parse(localStorage.getItem(ArchiveCollection.LOCAL_STORAGE_KEY));
        this.collectedIds = localStorageArchives || [];

        // Stores all archives
        for (const archive of archives) {
            const archiveObj = new Archive(
                archive.id,
                archive.title,
                archive.content,
                this.collectedIds.includes(archive.id)
            );

            this.allArchives = [...this.allArchives, archiveObj];
        }
    }

    collect(id) {
        const archive = this.getArchive(id);

        if (archive && !this.collectedIds.includes(id)) {
            this.collectedIds = [...this.collectedIds, id];
            archive.collected = true;
            localStorage.setItem(ArchiveCollection.LOCAL_STORAGE_KEY, JSON.stringify(this.collectedIds));
        }
    }

    getCollectedIds() {
        return this.collectedIds;
    }

    /**
     * Returns the Archive from the specified id, whether it's been collected or not (this will be specified in its 'collected' attribute).
     * @param id The Archive's id.
     */
    getArchive(id) {
        return this.allArchives.find(archive => archive.id === id);
    }
}

class Archive {
    id;
    title;
    content;
    collected;

    constructor(id, title, content, collected=false) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.collected = collected;
    }
}
