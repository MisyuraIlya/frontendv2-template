/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tab as MuiTab, TabProps } from '@mui/material'

type SingleTabProps = {
  label: string
  children?: React.ReactNode
} & Omit<TabProps, 'label' | 'children'>

export const Tab = ({ label, children, ...props }: SingleTabProps) => (
  <MuiTab label={label} {...props} />
)
