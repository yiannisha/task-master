import { ReactNode } from 'react'
import { Row } from 'reactstrap'

export default function Title({ text, children }: { text?: string, children?: ReactNode }) {
  return (
    <Row>
        <h1 className='font-bold text-6xl'>{ text || children }</h1>
    </Row>
  )
}
