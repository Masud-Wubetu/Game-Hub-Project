import {FaWindows, FaGlobe } from 'react-icons/fa'

import { Game } from '../hooks/useGames'
import { Card, CardBody, Heading, HStack, Icon, Image} from '@chakra-ui/react'

interface Props {
    game: Game
}

const GameCard = ({ game }: Props) => {
  return (
    <Card>
        <Image src={game.thumbnail}/>
        <CardBody>
            <Heading fontSize='2xl'>{game.title}</Heading>
            <HStack marginY={'10px'}>
              {game.platform?.includes("Windows") && (
                <Icon as={FaWindows} color="gray.500" />
              )}

              {game.platform?.includes("Web") && (
                <Icon as={FaGlobe} color="gray.500" />
              )}
            </HStack>
        </CardBody>
    </Card> 
  )
}

export default GameCard
