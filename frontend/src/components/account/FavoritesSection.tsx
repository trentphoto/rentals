import { Product } from "@/types/products"
import CameraCard from "../CameraCard"
import DashboardSection from "./DashboardSection"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const FavoritesSection = () => {

    // define favorites state as array of products or an empty array
    const [favorites, setFavorites] = useState<Product[] | []>([])
  
    const router = useRouter()

    useEffect(() => {
  
      const base = process.env.NEXT_PUBLIC_API_URL
      
      // define headers
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      
      const reqUrl = `${base}/favorites`
  
      // fetch favorites from api
      fetch(reqUrl, {
          method: 'GET',
          headers
      })
      .then(response => response.json())
      .then(favData => {
          // if token is invalid, log user out
          if (favData.message == "Invalid token.") {
              localStorage.removeItem('token')
              localStorage.removeItem('user_id')
              localStorage.removeItem('email')
              router.push('/login')
          }

          // if success
          if (favData.success) {
          // fetch each inventory item from the api
  
            Promise.all(favData.data.message.map((fav: any) => 
              fetch(`${base}/products/id/${fav.inventory_id}`, {
                method: 'GET',
                headers
              }).then(response => response.json())
            ))
            .then(inventoryDataArr => {
  
              const filteredArr = inventoryDataArr.map(item => item[0])
  
              // set the state 
              setFavorites(filteredArr)
            })
            .catch(error => {
              // Handle errors here
              console.error('Error:', error);
            });
  
          } else { // if not success
              // set the state to an empty array
              setFavorites([])
          }
      })
      .catch(error => {
          // Handle errors here
          console.error('Error:', error);
      });
  
  
    }, [])
  
    return (
      <DashboardSection>
        {
          // if user has favorites
          favorites ? (
            <>
              <div className="font-bold mb-8">
                Favorites
              </div>
  
              <div className="">
  
                {/* favorites list  */}
                {
                  favorites.map((product: Product) => (
                    
                    <CameraCard
                        key={product.id}
                        variant={product.category == 'cameras' ? 'dark' : product.category == 'lenses' ? 'light' : 'white'}
                        size='full'
                        imageUrl={product.image_url}
                        title={product.name}
                        subtitle={product.description}
                        href={`/products/${product.slug}`}
                      />
  
                  ))
                }
  
              </div>
            </>
          ) : (
            <>
              <div className="font-bold">
                Favorites
              </div>
  
              <div className="text-sm text-gray-400">
                You have no favorites
              </div>
            </>
          )
        }
  
      </DashboardSection>
    )
  }

  export default FavoritesSection
  