<template>
    <div class="test-container">
        <h1>Test2 Page</h1>
        <p>This is another test page for router-view functionality.</p>

        <div class="input-select-demo">
            <h2>InputSelect Component Demo</h2>
            <div class="demo-item">
                <label>Test 1: Select from options</label>
                <InputSelect v-model="selectedValue1" :options="options1" placeholder="Select an option" />
                <p>Selected: {{ selectedValue1 }}</p>
            </div>

            <div class="demo-item">
                <label>Test 2: Manual input allowed</label>
                <InputSelect v-model="selectedValue2" :options="options2" placeholder="Enter or select" />
                <p>Selected: {{ selectedValue2 }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputSelect from '../components/InputSelect.vue';

// Test data
const selectedValue1 = ref('option1');
const selectedValue2 = ref('');

const options1 = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' }
];

const options2 = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
    { value: '8', label: 'Option 8' },
    { value: '9', label: 'Option 9' },
    { value: '10', label: 'Option 10' },
    { value: '11', label: 'Option 11' },
    { value: '12', label: 'Option 12' },
    { value: '13', label: 'Option 13' },
    { value: '14', label: 'Option 14' },
    { value: '15', label: 'Option 15' },
];
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
    padding: 20px;
}

h1 {
    color: white;
    font-size: 32px;
    margin-bottom: 20px;
}

h2 {
    color: white;
    font-size: 24px;
    margin: 30px 0 20px 0;
}

p {
    color: white;
    font-size: 18px;
    text-align: center;
}

.input-select-demo {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.demo-item {
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
        color: white;
        font-size: 16px;
        font-weight: bold;
    }

    :deep(.input-select-wrapper) {
        width: 100%;
        max-width: 300px;
    }
}
</style>