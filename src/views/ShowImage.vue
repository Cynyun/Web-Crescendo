<template>
    <div>
        <SlideShow :images="imageList" :maxVisibleBullets="5" paginationType="number" />
    </div>
</template>

<script setup lang="ts">
    import { getImageSrc } from '@/config';
const imageList = [
    { src: getImageSrc('guimie_image01.png'), link: 'https://example.com/link1' },
    { src: getImageSrc('guimie_image02.png'), link: 'https://example.com/link1' },
    { src: getImageSrc('guimie_image03.png'), link: 'https://example.com/link1' },
    { src: getImageSrc('guimie_image04.png'), link: 'https://example.com/link1' },
    { src: getImageSrc('guimie_image05.png'), link: 'https://example.com/link1' },
]
</script>

<style scoped></style>