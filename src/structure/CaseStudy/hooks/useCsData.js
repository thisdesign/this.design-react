import { useData } from 'structure/DataProvider'
import getCSByUid from 'util/getCSByUid'

/*

  Takes Case Studies from context
  and grabs one by its UID

 */

export default function useCsData(uid) {
  const { ctxCaseStudies } = useData()
  return getCSByUid(ctxCaseStudies, uid)
}
