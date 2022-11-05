import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="http://vesselbarbershop.com" target="_blank" rel="noopener noreferrer">
          VESSEL Barbershop
        </a>
        <span className="ms-1">&copy; 2022 STEVIA Team.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
