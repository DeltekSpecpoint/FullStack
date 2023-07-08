import { useEffect, useState } from "react"
import { getContacts } from "../api"

function useContacts() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContacts().then(data => {
      let items = {};
      for (let item of data.data) {
        items[item.id] = item
      }
      setData({
        items,
        page: data.page,
        pageSize: data.pageSize,
        totalCount: data.totalRecordCount
      })
      setLoading(false)
    })  
  }, [])

  return {
    loading,
    data
  }
}

export default useContacts