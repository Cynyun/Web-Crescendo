<template>
    <div class="test-container">
        <h1>Test1 Page</h1>
        <p>This is a test page for router-view functionality.</p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.test-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    // padding: 20px;
}

h1 {
    color: white;
    font-size: 32px;
    margin-bottom: 20px;
}

p {
    color: white;
    font-size: 18px;
    text-align: center;
}
</style>