</main>
<footer class="w-full h-24 bg-white rounded-t-2xl flex justify-center items-center">
                    <h2 class="text-purple-800 text-3xl">®GP MONDE</h2>
                </footer>
            </div>
        </div>
        <script>
            document.getElementById('type-produit').addEventListener('change', function () {
                const toxiciteField = document.getElementById('form-toxicity-container');
                if (this.value === 'chimique') {
                    toxiciteField.style.display = 'block';
                } else {
                    toxiciteField.style.display = 'none';
                }
            });
        </script>
</body>

</html>
