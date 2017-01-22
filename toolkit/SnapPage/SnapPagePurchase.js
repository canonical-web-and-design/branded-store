import React from 'react'

import SnapPageLogin from 'toolkit/SnapPage/SnapPageLogin'
import SnapPageConfirm from 'toolkit/SnapPage/SnapPageConfirm'

export default function SnapPagePurchase({
  status,
  onSignin,
  onAuthorize,
  onConfirm,
  onCancel,
}) {

  const authorizeSteps = [
    'wait-signin',
    'signing-in',
    'wait-authorize',
    'authorizing',
  ].includes(status)

  const confirmSteps = [
    'wait-confirm',
    'confirming1',
    'confirming2',
  ].includes(status)

  return (
    <section className='SnapPagePurchase'>
      {(() => {
        if (authorizeSteps) return (
          <SnapPageLogin
            status={status}
            onSignin={onSignin}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
          />
        )
        if (confirmSteps) return (
          <SnapPageConfirm
            status={status}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )
      })()}
    </section>
  )
}
