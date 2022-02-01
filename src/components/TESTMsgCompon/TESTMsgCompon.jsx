import react from 'react';

export default function TestMsgCompon({timestamp, message}) {

  return(
    <>
    <p>{message}</p>
    <p>{timestamp}</p>
    </>
  )
}