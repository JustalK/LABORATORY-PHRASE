/**
 * The module managing the home page
 * @module Home
 */

import React from 'react'
import Seo from '@components/Seo'
import { useTranslation } from 'react-i18next'

/**
 * @function Home
 * Create the component Home
 * @return {Object} Return the dom of the Home page
 */
const Home = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo title="Home" description="Description of Home" />
      <div>{t('title')}</div>
      <div>{t('description.part1')}</div>
      <div>{t('description.part2')}</div>
    </>
  )
}

export default Home
