import { useContactsContext } from "."

function useCreateContact() {
  const { create } = useContactsContext()

  return create
}

export default useCreateContact