<template>
  <div>
    <h1>Liste des Utilisateurs</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script setup>
  const users = ref([]);

  onMounted(async () => {
    try {
      const response = await useFetch('/api/users');
      users.value = await response.json();
      console.log('Utilisateurs récupérés:', users.value);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  });
</script>
