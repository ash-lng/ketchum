effect module Cool where { command = MyCmd } exposing (alert)

import Basics
import Task exposing (Task)
import AshCoreMod.AshCoreModCool

type alias State = ()

init : Task Never State
init =
  Task.succeed ()

type MyCmd = Alert String

alert : String -> Cmd msg
alert str =
  command (Alert str)
