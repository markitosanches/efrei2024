<template>
  <div class="min-h-screen flex items-center justify-center border-t border-gray-100">
    <div class="border mt-2 p-6 rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div v-show="message" class="bg-red-500 mb-2 text-white p-2 rounded">{{ message }}</div>
      <h2 class="text-2xl font-semibold mb-6">Update Product</h2>
      <div v-if="!submitted">
        <form>
          <div class="mb-4">
            <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" id="productName" class="mt-1 p-2 border w-full rounded-md" v-model="product.name"/>
          </div>
          <div class="mb-4">
            <label for="productPhoto" class="block text-sm font-medium text-gray-700">Product Photo</label>
            <input type="text" id="productPhoto" class="mt-1 p-2 border w-full rounded-md" v-model="product.photo" />
          </div>
          <div class="mb-4">
            <label for="productPrice" class="block text-sm font-medium text-gray-700">Price (CAD)</label>
            <input type="text" id="productPrice" class="mt-1 p-2 border w-full rounded-md"  v-model.number="product.price" />
          </div>
          <div class="mb-4">
            <label for="productDescription" class="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea id="productDescription" class="mt-1 p-2 border w-full rounded-md" v-model="product.description"></textarea>
          </div>
          <div class="mb-4">
            <label for="productType" class="block text-sm font-medium text-gray-700">Product Type</label>
            <select id="productType" class="mt-1 p-2 border w-full rounded-md" v-model="product.type">
              <option value="">Select</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Footwear">Footwear</option>
              <option value="Beauty">Beauty</option>
              <option value="Travel Accessories">Travel Accessories</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          <div class="mb-6">
            <button type="button" @click="updateProduct" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Update
            </button>
             <button type="button" @click="deleteProduct" class="w-full mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
              Delete
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        <div class="text-green-600 font-semibold mb-4">Product updated Successfully!</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'
export default {
  props: ['updateInv', 'inventory', 'removeInv', 'remItem'],
  data () {
    return {
      message: null,
      submitted: false,
      product: {},
      id: parseInt(this.$route.params.id)
    }
  },
  methods: {
    updateProduct () {
      ProductDataService.update(this.id, this.product)
        .then((response) => {
          this.updateInv(this.productIndex, this.product)
          this.message = null
          this.submitted = true
        })
        .catch((e) => {
          this.message = e.response.data.message
        })
    },
    deleteProduct () {
      ProductDataService.delete(this.id)
        .then(response => {
          this.remItem(this.product.name)
          this.removeInv(this.productIndex)
          this.$router.push({ name: 'home' })
        })
        .catch((e) => {
          this.message = e.response.data.message
        })
    }
  },
  computed: {
    productIndex () {
      const index = this.inventory.findIndex((p) => {
        return p.id === this.id
      })
      return index
    }
  },
  mounted () {
    ProductDataService.get(this.id)
      .then(response => {
        this.product = response.data
      })
  }
}
</script>
